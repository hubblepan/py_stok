# -*- coding:utf-8 -*-
import time
from datetime import datetime
print(datetime.now())
print(datetime.now().strftime('%Y%m%d'))
# print(time.strftime(fmt='%Y%m%d',  time.localtime(time.time())))
# time.strptime(str,fmt='%a %b %d %H:%M:%S %Y')

import numpy as np
data = np.array([
    [1, 2, 3, 4, 6],
    [2, 4, 6, 8, 10],
    [1, 3, 5, 7, 9],
    [7, 1, 8, 2,  3]
])
print(data.shape)