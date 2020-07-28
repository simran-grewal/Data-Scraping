from scrape import InstagramBot

def get_images(user, name, tags):
    bot = InstagramBot('7783250627', 'Langara!')

    profiles = name.split(' ')
    hashTags = tags.split(' ')
    
    images = bot.search(profiles, hashTags)
    return images
