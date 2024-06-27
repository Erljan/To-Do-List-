from flask import request, jsonify
from config import db, app
from models import Task

with app.app_context():
    db.create_all()



@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])
    # return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_tasks():
    data = request.json
    new_task = Task(text=data["text"])
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201

@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return "", 204
    return jsonify({"error": "Task not found"}), 404

@app.route("/tasks/<int:id>", methods=["PUT"])
def toggle_task(id):
    tasks = Task.query.get(id)
    if tasks:
        tasks.completed = not tasks.completed
        db.session.commit()
        return jsonify(tasks.to_dict())


if __name__ == "__main__":
    app.run(debug=True, port=8001)
    # db.create_all()

