from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
import time


class InstagramBot():
    def __init__(self, email, password):
        options = Options()
        options.headless = True
        self.browser = webdriver.Chrome(
            './chromedriver', chrome_options=options)
        self.email = email
        self.password = password
        self.timeout = 10

    def signIn(self):
        self.browser.get('https://www.instagram.com/accounts/login/')
        try:
            myElem = WebDriverWait(self.browser, self.timeout).until(EC.presence_of_element_located((By.XPATH, '//input[@name = "username"]')))
            emailInput = self.browser.find_element_by_xpath(
            '//input[@name = "username"]')
            passwordInput = self.browser.find_element_by_xpath(
                '//input[@name = "password"]')
            emailInput.send_keys(self.email)
            passwordInput.send_keys(self.password)
            passwordInput.send_keys(Keys.ENTER)
        except TimeoutException:
            print("Timed out waiting for page to load")

    def search(self, profiles, hashTags):
        self.signIn()
        links = []
        
        for profile in profiles:
            try:
                myElem = WebDriverWait(self.browser, self.timeout).until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder = "Search"]')))
                search_text_box = self.browser.find_element_by_xpath('//input[@placeholder = "Search"]')
                search_text_box.send_keys(profile)
                try:
                    WebDriverWait(self.browser, self.timeout).until(EC.presence_of_element_located((By.XPATH, f'//a[@href = "/{profile}/"]'))).click()
                except TimeoutException:
                    print("Timed out waiting for page to load")
                #open first pic
                try:
                    WebDriverWait(self.browser, self.timeout).until(EC.presence_of_element_located((By.XPATH, f'//article//a'))).click()
                except TimeoutException:
                    print("Timed out waiting for page to load")
                
                #Figure out for loop    
                while(True):
                    try:
                        WebDriverWait(self.browser, self.timeout).until(EC.presence_of_element_located((By.XPATH, f'//div[@role="dialog"]//img[@src]')))
                        #ToDo
                        #Figure out a way to get text from caption
                        #See if hash tag in caption
                        #if Yes, use the below code to get link of image
                        images = self.browser.find_elements_by_xpath(f'//div[@role="dialog"]//img[@src]')
                        links.append(images[1].get_attribute("src"))
                    except TimeoutException:
                        print("Timed out waiting for page to load")

                    #Next Picture
                    try:
                        self.browser.find_element_by_link_text("Next").click()
                    except NoSuchElementException:
                        break;
                    
            except TimeoutException:
                print("Timed out waiting for page to load")        
        return links