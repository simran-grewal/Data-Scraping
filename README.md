# Data-Scraping from Instagram using selenium


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes

### First of all, Clone the Repository

### Prerequisites
What things you need to install inorder to run frontend server
```
1> node
2> npm
3> yarn
```
### To run the frontend server
```
Open the terminal and go inside the project directory
```
#### Run the following two commands
```
yarn
npm start
```
### To run the Backend server
```
In the first parameter of webdriver.Chrome (inside scrape.py) put the relative path of ChromeDriver i.e webdriver.Chrome([your path],) 
```
```
Pass your instagram id and password as the arguments in the InstagramBot function in function.py i.e InstagramBot([user_name], [password])
```
```
Open one more terminal(don't close the 1st one) and go inside the project directory
```
#### Create a virtual environment
##### Follow this documentation for creating and activating a virtual environment
```
https://flask.palletsprojects.com/en/1.1.x/installation/
```


#### Install the requirement.txt and run the application
```
$ pip install -r requirements.txt
$ export FLASK_APP=main.py
$ flask run
```

### visit this url in your browser and enjoy the application
```
http://localhost:8080/
```
![gif_bot_2](https://user-images.githubusercontent.com/19415171/89256513-21ce2900-d5d9-11ea-8f70-8a93c34a9780.gif)

