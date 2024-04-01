FROM python:3-slim
WORKDIR /usr/src/app/amqp_setup
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["amqp_setup.py", "./"]
CMD [ "python", "-u", "./amqp_setup.py" ]