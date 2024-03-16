FROM python:3-slim
WORKDIR /usr/src/app/appointment_microservice
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["appointment.py", "./"]
COPY ["database", "./database"]
CMD [ "python", "./appointment.py" ]