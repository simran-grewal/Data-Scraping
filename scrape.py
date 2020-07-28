from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains
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
            WebDriverWait(self.browser, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//input[@name = "username"]')))
            emailInput = self.browser.find_element_by_xpath(
                '//input[@name = "username"]')
            passwordInput = self.browser.find_element_by_xpath(
                '//input[@name = "password"]')
            emailInput.send_keys(self.email)
            passwordInput.send_keys(self.password)
            passwordInput.send_keys(Keys.ENTER)
        except TimeoutException:
            print("Timed out waiting for page to load")

    def search_by_only_name_or_hashtag(self, name):
        self.signIn()
        links = []
        hash = name
        if(name[0] == '#'):
            hash = f'explore/tags/{name[1:]}'
        try:
            WebDriverWait(self.browser, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//input[@placeholder = "Search"]')))
            search_text_box = self.browser.find_element_by_xpath(
                '//input[@placeholder = "Search"]')
            search_text_box.send_keys(name)

            try:
                WebDriverWait(self.browser, self.timeout).until(EC.presence_of_element_located(
                    (By.XPATH, f'//a[@href = "/{hash}/"]'))).click()
            except TimeoutException:
                print("Timed out waiting for page to load")

            try:
                WebDriverWait(self.browser, self.timeout).until(EC.presence_of_all_elements_located(
                    (By.XPATH, '//div[@class="KL4Bh"]/img[@src]')
                ))
                images = self.browser.find_elements_by_xpath(
                    '//div[@class="KL4Bh"]/img[@src]')
                for image in images:
                    links.append(image.get_attribute("src"))

            except TimeoutException:
                print("Timed out waiting for page to load")
        except TimeoutException:
            print("Timed out waiting for page to load")
        return links

    def search(self, profiles, hashTags):
        print(profiles)
        print(hashTags)
        self.signIn()
        links = []

        for profile in profiles:
            try:
                WebDriverWait(self.browser, self.timeout).until(
                    EC.presence_of_element_located((By.XPATH, '//input[@placeholder = "Search"]')))
                search_text_box = self.browser.find_element_by_xpath(
                    '//input[@placeholder = "Search"]')
                search_text_box.send_keys(profile)
                try:
                    WebDriverWait(self.browser, self.timeout).until(EC.presence_of_element_located(
                        (By.XPATH, f'//a[@href = "/{profile}/"]'))).click()
                except TimeoutException:
                    print("Timed out waiting for page to load")
                # open first pic
                try:
                    time.sleep(5)
                    WebDriverWait(self.browser, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, f'//article//a'))).click()
                except TimeoutException:
                    print("Timed out waiting for page to load")

                count = 0
                while(count < 30):
                    try:
                        WebDriverWait(self.browser, self.timeout).until(
                            EC.presence_of_element_located((By.XPATH, f'//div[@role="dialog"]//img[@src]')))
                        list_of_caption = self.browser.find_elements_by_xpath(
                            f'//div[@class = "C7I1f X7jCj"]//span/a[@class = " xil3i"]')
                        list_of_hash_tag = []
                        for tag in list_of_caption:
                            for hash_tag in hashTags:
                                if tag.text == '#' + hash_tag:
                                    # comparing the hashtags of a image with the hashtag we sent
                                    # if there is a match then we add the link of a image in a list
                                    images = self.browser.find_elements_by_xpath(
                                        f'//div[@role="dialog"]//img[@src]')
                                    links.append(
                                        images[1].get_attribute("src"))
                                    break

                    except TimeoutException:
                        print("Timed out waiting for page to load")

                    # Next Picture
                    try:
                        self.browser.find_element_by_link_text("Next").click()
                    except NoSuchElementException:
                        break
                    count += 1
                try:
                    action = ActionChains(self.browser)
                    action.move_by_offset(int(0), int(0))
                    action.click().perform()
                except NoSuchElementException:
                    print("couldnt find")
                 
            except TimeoutException:
                print("Timed out waiting for page to load")
        return links
