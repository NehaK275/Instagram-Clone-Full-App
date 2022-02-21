Firstly in you need to download the dependencies by typing in the terminal in your environment:

pip install -r ./requirements.txt

In order to turn on the backend server you simlpy just need to run in the terminal in the current directory:

uvicorn main:app --reload 

You can add as well --host/ --port if needed. (DEFAULT: port: 8000, host: localhost).
