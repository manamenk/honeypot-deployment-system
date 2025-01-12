import os
import subprocess
import boto3
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory store for honeypots (can be replaced with a database)
honeypots = []

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Honeypot Deployment System!"})

@app.route("/deploy", methods=["POST"])
def deploy_honeypot():
    honeypot_type = request.json.get("type", "cowrie")
    location = request.json.get("location", "US-East")
    
    # Trigger Terraform deployment
    try:
        result = subprocess.run(
            ["terraform", "apply", "-auto-approve"],
            cwd="./terraform",
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        if result.returncode == 0:
            # Add honeypot details to the in-memory store
            new_honeypot = {
                "id": len(honeypots) + 1,
                "type": honeypot_type,
                "location": location,
                "status": "Running"
            }
            honeypots.append(new_honeypot)
            return jsonify({"message": f"{honeypot_type} honeypot deployed successfully!", "honeypot": new_honeypot})
        else:
            return jsonify({"error": "Terraform deployment failed", "details": result.stderr}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/logs/<int:honeypot_id>", methods=["GET"])
def get_logs(honeypot_id):
    # Retrieve logs for a specific honeypot
    bucket_name = "honeypot-logs1"
    log_key = f"honeypot-{honeypot_id}.log"

    try:
        # Use AWS S3 to fetch the logs
        s3 = boto3.client("s3")
        response = s3.get_object(Bucket=bucket_name, Key=log_key)
        logs = response["Body"].read().decode("utf-8").splitlines()
        return jsonify({"logs": logs[-50:]})  # Return last 50 lines
    except s3.exceptions.NoSuchKey:
        return jsonify({"error": f"Log file for Honeypot ID {honeypot_id} not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/honeypots", methods=["GET"])
def list_honeypots():
    # Return the list of all deployed honeypots
    return jsonify({"honeypots": honeypots})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
