from decimal import *
getcontext().prec = 182

# ASCII colors
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

previous_one = 0
previous_two = 1
previous_answer = 1
previous_ratio = 0



for i in range(500):
    failed = False
    new_string = ""
    answer = previous_one + previous_two
    ratio = Decimal(answer)/Decimal(previous_answer)
    for i in range(len(str(ratio))):
        if(len(str(previous_ratio))<i+1):
            new_string += bcolors.FAIL + str(ratio)[i:len(str(ratio))]
            break
        if(str(ratio)[i] == str(previous_ratio)[i]):
            new_string += bcolors.OKBLUE + str(ratio)[i]
        else:
            new_string += bcolors.FAIL + str(ratio)[i]
            failed = True
    if(failed == False and len(str(ratio)) > 5):
        break
    limit = 0
    if(len(str(ratio)) > 10):
        limit = 1
    print(new_string[0:len(new_string)-limit] + bcolors.ENDC)

    previous_one = previous_two
    previous_two = answer
    previous_answer = answer
    previous_ratio = ratio


