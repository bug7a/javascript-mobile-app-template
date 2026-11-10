/* Bismillah */

/*
TASKS (a tab): a list that is saved on the device. The count of the open tasks is on the tab.
TaskList keeps the data, so another page can add a task (pages/product.js).
*/

"use strict";

// The saved tasks: [{ text, done }]
const TaskList = {};

TaskList.getAll = function () {
    return App.load("tasks", []);
};

TaskList.saveAll = function (tasks) {
    App.save("tasks", tasks);
    TaskList.refreshBadge(tasks);
};

// Returns the new list
TaskList.add = function (text) {
    const tasks = TaskList.getAll();
    tasks.push({ text: text, done: 0 });
    TaskList.saveAll(tasks);
    return tasks;
};

TaskList.refreshBadge = function (tasks = TaskList.getAll()) {
    const openCount = tasks.filter((task) => !task.done).length;
    App.setTabBadge("tasks", openCount);
};

App.whenStarted(TaskList.refreshBadge);

App.addPage({

    id: "tasks",
    title: "Tasks",

    create: function (box) {

        const FIELD_HEIGHT = 64; // The height of the TextField field: the button stands next to it

        // CARD: A new task
        App.startCard();

            // GROUP: The field and the button
            HGroup({ width: "100%", height: "auto", gap: 10, align: "left bottom" });

                const taskInput = TextField({
                    styleName: "ozden",
                    width: "100%",
                    titleText: "NEW TASK",
                    placeholder: "Buy bread",
                    required: 0,
                    maxLength: 80,
                    grow: 1,
                });

                SmartButton({
                    tone: "cyan",
                    labelText: "Add",
                    width: 80,
                    height: FIELD_HEIGHT,
                    shrink: 0,
                    onClick: addTypedTask,
                });

            endGroup();

        App.endCard();

        App.createCaption("MY TASKS");

        // GROUP: The rows of the tasks (drawTasks)
        const taskGroup = VGroup({ width: "100%", height: "auto", gap: 8, clipContent: 0 });
        endGroup();

        App.createButton({
            labelText: "Clear the done tasks",
            onClick: clearDoneTasks,
        });

        // *** FUNCTIONS:

        function addTypedTask() {
            const text = taskInput.getValue().trim();
            if (text === "") return;
            const tasks = TaskList.add(text);
            taskInput.setValue("");
            drawTasks(tasks);
        }

        function drawTasks(tasks = TaskList.getAll()) {
            taskGroup.children.forEach((row) => row.remove());
            createIn(taskGroup, function () {
                if (tasks.length === 0) createEmptyView();
                tasks.forEach(createTaskRow);
            });
        }

        function createTaskRow(task, index) {

            // GROUP: A task
            HGroup({ width: "100%", height: "auto", gap: 12, padding: [14, 6], color: App.colors.surface, round: 12 });

                const checkBox = CheckBox({
                    labelText: basic.escapeHtml(task.text), // (the label is HTML; the text is the user's)
                    wrapLabel: 1,
                    grow: 1,
                    checked: task.done ? 1 : 0,
                    onChange: (self) => setTaskDone(index, self.checked, self.label),
                });
                paintTaskText(checkBox.label, task.done);

                const btnDelete = App.createIconButton(App.ICON_PATHS.trash, "Delete", () => deleteTask(index));
                btnDelete.shrink = 0;

            endGroup();

        }

        function createEmptyView() {
            Label({
                text: "No tasks yet.",
                width: "100%",
                padding: [0, 28],
                textColor: App.colors.softText,
                textAlign: "center",
                border: 2,
                borderColor: App.colors.line,
                round: 12,
                css: { borderStyle: "dashed" },
            });
        }

        function setTaskDone(index, isDone, lblText) {
            const tasks = TaskList.getAll();
            tasks[index].done = isDone ? 1 : 0;
            TaskList.saveAll(tasks);
            paintTaskText(lblText, isDone);
        }

        // A done task is soft and crossed out
        function paintTaskText(lblText, isDone) {
            lblText.textColor = isDone ? App.colors.softText : App.colors.text;
            lblText.css = { textDecoration: isDone ? "line-through" : "none" };
        }

        function deleteTask(index) {
            const tasks = TaskList.getAll();
            tasks.splice(index, 1);
            TaskList.saveAll(tasks);
            drawTasks(tasks);
        }

        async function clearDoneTasks() {
            const tasks = TaskList.getAll();
            const doneCount = tasks.filter((task) => task.done).length;
            if (doneCount === 0) {
                Toast.show({ type: "info", messageText: "There is no done task." });
                return;
            }
            const isSure = await Dialog.confirm({
                titleText: "Clear the done tasks?",
                messageText: doneCount + " done task(s) will be deleted.",
                confirmText: "Clear",
                danger: 1,
            });
            if (!isSure) return;
            const openTasks = tasks.filter((task) => !task.done);
            TaskList.saveAll(openTasks);
            drawTasks(openTasks);
        }

        // *** INIT:
        taskInput.input.on("keydown", function (self, event) {
            // WHY isComposing: the Enter of a phone keyboard that is still writing a word does not add a half word.
            if (event.key == "Enter" && !event.isComposing) addTypedTask();
        });
        drawTasks();

    },

});
