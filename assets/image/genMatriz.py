import sys
import numpy as np
import cv2
import os
import argparse


FILE_NAME = None

parser = argparse.ArgumentParser()
parser.add_argument("-f", dest="file", help="Set file do gen matriz", type=str, default=FILE_NAME)
args = parser.parse_args()

if(args.file is None):
    print("File not found")

imgRecognize = cv2.imread("{}.png".format(args.file), cv2.IMREAD_UNCHANGED)

if imgRecognize is None:
    print("Error: image not read from file \n\n")
    sys.exit()


imgGray = cv2.cvtColor(imgRecognize[:,:,:3], cv2.COLOR_BGR2GRAY)
# imgBlurred = cv2.GaussianBlur(imgGray, (5, 5), 0)

imgThresh = cv2.adaptiveThreshold(imgGray,
                                  255,
                                  cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                  cv2.THRESH_BINARY_INV,
                                  5,
                                  1)

cv2.imshow('show', imgThresh)
cv2.waitKey(0)

# imgThreshCopy = imgThresh.copy()
npaContours, imgContours = cv2.findContours(imgThresh,
                                            cv2.RETR_EXTERNAL,
                                            cv2.CHAIN_APPROX_NONE)
npaContours.reverse()                                        
for npaContour in npaContours:
    if cv2.contourArea(npaContour) > 300:
        [intX, intY, intW, intH] = cv2.boundingRect(npaContour)
        # cv2.imshow("oi", imgThresh[intX:intW,intY:intH])
        print("[{},{},{},{}],".format(intX,intY,intW,intH))
