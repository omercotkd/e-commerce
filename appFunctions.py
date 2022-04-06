from datetime import datetime
import pytz


def filter_keys(dictionary: dict, keys: list):
    for key in keys:
        try:
            del dictionary[key]
        except KeyError:
            print(f'key "{key}" doesn`t exist!')
    return dictionary


def replace_key(dictionary: dict, old_key: str, new_key: str):

    dictionary[new_key] = dictionary.pop(old_key, 0)
    return dictionary


def get_time_in_israel():
    tz = pytz.timezone("Israel")
    israel_now = datetime.now(tz)
    return israel_now


def check_time_passed(starting_time: str):
    '''will take a date from the orders table as input and will test how much time as passed since the time in the string
    , will retrun the amount of hours passed.
    '''

    starting_time_as_datetime = datetime.strptime(
        starting_time[0:29] + starting_time[30:], "%Y-%m-%d %H:%M:%S.%f%z")

    seconds = get_time_in_israel().timestamp() - starting_time_as_datetime.timestamp()

    hours = seconds / 3600

    return hours
