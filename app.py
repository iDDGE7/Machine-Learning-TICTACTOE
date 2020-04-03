from flask import Flask, render_template, Response, request, redirect, url_for, jsonify
from main import arrayJoin, exectPred

app = Flask(__name__)


@app.route('/machinePredict', methods=['GET'])
def machinePredict():
    p0 = request.args.get('p0')
    p1 = request.args.get('p1')
    p2 = request.args.get('p2')
    p3 = request.args.get('p3')
    p4 = request.args.get('p4')
    p5 = request.args.get('p5')
    p6 = request.args.get('p6')
    p7 = request.args.get('p7')
    p8 = request.args.get('p8')
    matrixGame = []
    matrixGame = arrayJoin(int(p0), int(p1), int(p2), int(
        p3), int(p4), int(p5), int(p6), int(p7), int(p8))
    machinePosition = exectPred(matrixGame)
    matrixGame[machinePosition] = int(1)
    return jsonify(matrixGame=matrixGame, machinePosition=machinePosition)


@app.route("/")
def main():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host='127.0.0.1', port='8500')
