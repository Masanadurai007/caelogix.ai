import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from config import settings


def send_contact_notification(name: str, email: str, company: str, message: str, service_interest: str):
    """Sends an email to the studio's inbox when a contact form is submitted.

    Silently does nothing if SMTP credentials aren't configured, so local
    development without email setup doesn't crash the contact endpoint.
    """
    if not settings.smtp_user or not settings.smtp_app_password:
        return

    msg = MIMEMultipart()
    msg["From"] = settings.smtp_user
    msg["To"] = settings.smtp_user
    msg["Subject"] = f"New contact form submission — {name}"

    body = f"""
New message from the Caelogix contact form:

Name: {name}
Email: {email}
Company: {company or "-"}
Service interested in: {service_interest or "-"}

Message:
{message}
"""
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(settings.smtp_user, settings.smtp_app_password)
            server.sendmail(settings.smtp_user, settings.smtp_user, msg.as_string())
    except Exception as e:
        # Don't let an email failure break the contact form submission itself
        print(f"Failed to send contact notification email: {e}")