# base image
FROM python:3.11.3

# set the working directory in the container
WORKDIR /app

# copy the Flask app code to the container
COPY . /app

RUN python -m venv venv
ENV VIRTUAL_ENV=/app/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# install necessary packages
RUN apt-get update
RUN apt-get install -y libgl1-mesa-glx

RUN pip3 install --upgrade pip
RUN pip3 install --root-user-action=ignore requests
RUN pip3 install flask
RUN pip3 install flask_cors
RUN pip3 install flask_sqlalchemy
RUN pip3 install pymysql
RUN pip3 install torch torchvision torchaudio
RUN pip3 install PILLOW
RUN pip3 install opencv_python
RUN pip3 install pandas
RUN pip3 install requests
RUN pip3 install psutil
RUN pip3 install pyyaml
RUN pip3 install tqdm
RUN pip3 install matplotlib
RUN pip3 install seaborn
RUN pip3 install openai
RUN pip3 install boto3
RUN pip3 install ultralytics


# set environment variables
ENV FLASK_APP=flowery
ENV FLASK_RUN_PORT=5000

# expose the port that Flask will run on
EXPOSE 5000

# run the Flask app
CMD [ "flask", "run", "--host=0.0.0.0", "--port=5000" ]