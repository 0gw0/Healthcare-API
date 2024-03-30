FROM python:3-slim
WORKDIR /usr/src/app/medical_certificate_microservice
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["medical_certificate.py", "./"]
CMD [ "python", "-u", "./medical_certificate.py" ]