FROM python:3-slim
WORKDIR /usr/src/app/manage_booking_complex_microservice
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["manage_booking.py", "./"]
COPY ["database", "./database"]
CMD [ "python", "-u", "./manage_booking.py" ]