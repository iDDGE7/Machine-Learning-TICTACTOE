import pandas as pd
import csv
import random
from sklearn.neighbors import KNeighborsClassifier  # KNN
from sklearn.metrics import accuracy_score  # Accuracy
from sklearn.tree import DecisionTreeClassifier  # Decisition Tree Classifier
from sklearn.model_selection import train_test_split  # split data set
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from sklearn import metrics
from sklearn.metrics import classification_report

######## Claen Data #######


def cleanData(data):
    data = pd.DataFrame(data)
    sizeData = len(data)
    sizeDataRow = data.shape[1]
    features = []
    clases = []
    row = []
    for i in range(sizeData):
        row = []
        for e in range(sizeDataRow-1):
            row.append(float(data.loc[i, e]))
        features.append(row)
        clases.append(data.loc[i, sizeDataRow-1])
    return features, clases

###### used cleanData  #######


with open('tic-tac-toe.csv', 'r') as csvfile:
    data = csv.reader(csvfile, delimiter=',', quotechar='|')
    dataFeatures, dataClass = cleanData(data)

############# Split 80% training, 20% test ############

featuresTrain, featuresTest, classTrain, classTest = train_test_split(
    dataFeatures, dataClass, test_size=0.2)

############ Classifier KNN ##########

classifier = KNeighborsClassifier(n_neighbors=5)
classifier.fit(featuresTrain, classTrain)


def predict(matrixGame):
    probArray = []
    matsMirror = []
    valuesEqual = 0
    selectPositionMachine = 0
    sizeFilled = checkCells(matrixGame)
    condition = 0
    if sizeFilled <= 3:
        condition = 0
    else:
        condition = 2

    for i in range(len(featuresTest)):
        prob = classifier.predict_proba([featuresTest[i]])
        probArray.append(prob[0])

    # Choosing similar matrix

    for i in range(len(featuresTest)):
        if probArray[i][1] > probArray[i][0]:
            for e in range(len(featuresTest[i])):
                if matrixGame[e] == featuresTest[i][e] and matrixGame[e] != 0.0 and matrixGame[e] == 1.0:
                    valuesEqual = valuesEqual + 1
            if valuesEqual >= condition:
                matsMirror.append(featuresTest[i])
            valuesEqual = 0

    maxim = 0
    betterMatrix = 0
    if len(matsMirror) != 1:
        for i in range(len(matsMirror)):
            probMat = classifier.predict_proba([matsMirror[i]])
            if maxim < probMat[0][0]:
                maxim = probMat[0][0]
                betterMatrix = i
    else:
        betterMatrix = 0

    while True:
        selectPositionMachine = random.randrange(0, 9, 1)
        if matrixGame[selectPositionMachine] == 0:
            if matsMirror[betterMatrix][selectPositionMachine] == 1.0:
                break
            else:
                break

    return selectPositionMachine


def checkCells(matrixGame):
    sizeFill = 0
    for i in matrixGame:
        if i != 0:
            sizeFill += 1
    return sizeFill


def arrayJoin(p0, p1, p2, p3, p4, p5, p6, p7, p8):
    matrixG = [p0,p1,p2,p3,p4,p5,p6,p7,p8]
    return matrixG


def exectPred(matrixGame):
    positonMachine = predict(matrixGame)
    return positonMachine


