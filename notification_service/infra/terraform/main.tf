provider "aws" {
  region = var.region
}

resource "aws_s3_bucket" "notification_logs" {
  bucket = "your-notification-service-logs"
  acl    = "private"
}
