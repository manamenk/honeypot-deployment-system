provider "aws" {
  region = "us-east-2"
}

# Security group with minimal exposure
resource "aws_security_group" "honeypot_sg" {
  name        = "honeypot-security-group"
  description = "Allow traffic for controlled honeypot demonstration"

  # Open port 2222 for SSH honeypot simulation (Cowrie)
  ingress {
    from_port   = 2222
    to_port     = 2222
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Egress (allow all outgoing traffic)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# IAM role for the instance to upload logs to S3
resource "aws_iam_role" "honeypot_instance_role" {
  name = "honeypot-instance-role"

  assume_role_policy = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "ec2.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }
  EOF
}

# IAM policy for S3 access
resource "aws_iam_policy" "honeypot_s3_policy" {
  name        = "honeypot-s3-policy"
  description = "Policy to allow EC2 to upload logs to S3"
  policy      = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "s3:PutObject",
          "s3:GetObject"
        ],
        "Resource": "arn:aws:s3:::honeypot-logs1/*"
      }
    ]
  }
  EOF
}

# Attach IAM policy to the role
resource "aws_iam_role_policy_attachment" "honeypot_policy_attachment" {
  role       = aws_iam_role.honeypot_instance_role.name
  policy_arn = aws_iam_policy.honeypot_s3_policy.arn
}

# Instance profile for the IAM role
resource "aws_iam_instance_profile" "honeypot_instance_profile" {
  name = "honeypot-instance-profile"
  role = aws_iam_role.honeypot_instance_role.name
}

# S3 bucket for logs
resource "aws_s3_bucket" "honeypot_logs1" {
  bucket = "honeypot-logs1"

  tags = {
    Name        = "Honeypot Logs"
    Environment = "Development"
  }
}

# EC2 instance for the honeypot
resource "aws_instance" "honeypot" {
  ami                  = "ami-036841078a4b68e14"
  instance_type        = "t2.micro"
  security_groups      = [aws_security_group.honeypot_sg.name]
  iam_instance_profile = aws_iam_instance_profile.honeypot_instance_profile.name
  key_name             = var.key_name  # Use variable for key pair name

  tags = {
    Name = "Secure-Honeypot"
  }

  # User data script for installing and configuring the Cowrie honeypot
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get install -y git python3 python3-virtualenv awscli
              git clone https://github.com/cowrie/cowrie.git /opt/cowrie
              cd /opt/cowrie
              virtualenv cowrie-env
              source cowrie-env/bin/activate
              pip install -r requirements.txt
              cp etc/cowrie.cfg.dist etc/cowrie.cfg
              sed -i 's/ssh_port = 22/ssh_port = 2222/' etc/cowrie.cfg
              
              # Set up periodic log uploads to S3
              echo "* * * * * aws s3 cp /opt/cowrie/var/log/cowrie/cowrie.log s3://honeypot-logs1/cowrie.log" | crontab -
              ./bin/cowrie start
              EOF
}

output "honeypot_public_ip" {
  value = aws_instance.honeypot.public_ip
}

# Variables for sensitive data
variable "key_name" {
  description = "Name of the key pair to use for SSH access"
}
