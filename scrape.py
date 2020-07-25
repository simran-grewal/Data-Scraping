from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time


class InstagramBot():
    def __init__(self, email, password):
        options = Options()
        options.headless = True
        self.browser = webdriver.Chrome(
            './chromedriver', chrome_options=options)
        self.email = email
        self.password = password

    def signIn(self, name):
        self.browser.get('https://www.instagram.com/accounts/login/')
        time.sleep(2)
        emailInput = self.browser.find_element_by_xpath(
            '//input[@name = "username"]')
        passwordInput = self.browser.find_element_by_xpath(
            '//input[@name = "password"]')
        emailInput.send_keys(self.email)
        passwordInput.send_keys(self.password)
        passwordInput.send_keys(Keys.ENTER)
        time.sleep(2)
        return self.search(name)

    def search(self, name):
        links = []
        hash = name
        if(name[0] == '#'):
            hash = f'explore/tags/{name[1:]}'

        search_text_box = self.browser.find_element_by_xpath(
            '//input[@placeholder = "Search"]')
        search_text_box.send_keys(name)
        time.sleep(1)
        self.browser.find_element_by_xpath(f'//a[@href = "/{hash}/"]').click()
        time.sleep(3)
        #images = self.browser.find_element_by_xpath('//img[@class="FFVAD"]')
        images = self.browser.find_elements_by_xpath(
            '//div[@class="KL4Bh"]/img[@src]')
        for image in images:
            links.append(image.get_attribute("src"))
        return links
