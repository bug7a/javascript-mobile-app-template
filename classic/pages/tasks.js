/* Bismillah */

/*
TASKS (a tab): a list that is saved on the device; the newest task is on the top. The count is on the tab.
- A tap on a task selects it (tomato); while tasks are selected, the delete bar takes the place of the add bar.
- When a task is added or deleted, the other tasks slide to their new places (top 0.2 s).
- TaskList keeps the data, so another page can add a task (pages/search.js).
*/

"use strict";

// The saved tasks: [{ text }], the newest first
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
    tasks.unshift({ text: text });
    TaskList.saveAll(tasks);
    return tasks;
};

TaskList.refreshBadge = function (tasks = TaskList.getAll()) {
    App.setTabBadge("tasks", tasks.length);
};

App.whenStarted(TaskList.refreshBadge);

App.addPage({

    id: "tasks",
    title: "Tasks",
    scroll: 0,
    bottomBarLine: 1,

    create: function (box) {

        const SPACE = 12;
        const BAR_HEIGHT = 96;
        const BAR_WIDTH = App.DESIGN_WIDTH - SPACE * 2;
        const LIST_TOP = SPACE + BAR_HEIGHT + SPACE;
        const ROW_TEXT_LEFT = 60;
        const ROW_SPACE = 12; // Above and under the text of a row
        const MAX_TASK_LENGTH = 80;
        const SELECTED_COLOR = "tomato";
        const ROW_MOTION = "top 0.2s";

        const rows = []; // { task, box, lblText, circle, isSelected }, in the order of the list

        // BOX: The page (its objects stand at their places)
        startBox({ width: "100%", height: "100%", color: "white" });

            // BOX: The add bar: the field and the round "+"
            const addBar = startBox(SPACE, SPACE, BAR_WIDTH, BAR_HEIGHT, { color: App.colors.whitesmoke, round: 19 });

                const taskInput = Input(24, 18, 456, 60, {
                    minimal: 1,
                    color: "transparent",
                    fontSize: 24,
                    placeholder: "Add a task",
                    textColor: App.colors.text,
                });
                taskInput.inputElement.maxLength = MAX_TASK_LENGTH;

                SmartButton({
                    left: 486,
                    top: 18,
                    width: 60,
                    height: 60,
                    labelText: "+",
                    ariaLabel: "Add",
                    style: {
                        layout: { padding: [0, 0] },
                        box: { color: "#23BCC1BB", round: 30, border: 0, boxShadow: "none" },
                        hover: { color: "#23BCC1DD" },
                        active: { color: "#23BCC1" },
                        label: { fontSize: 43, textColor: White(0.95) },
                    },
                    onClick: addTypedTask,
                });

            endBox();

            // BOX: The delete bar (in the place of the add bar while tasks are selected)
            const deleteBar = startBox(SPACE, SPACE, BAR_WIDTH, BAR_HEIGHT, { color: App.colors.whitesmoke, round: 19, visible: 0 });

                SmartButton({
                    left: (BAR_WIDTH - 66) / 2,
                    top: 15,
                    width: 66,
                    height: 66,
                    labelText: "",
                    iconFile: "assets/icons/trash-red.svg",
                    ariaLabel: "Delete the selected tasks",
                    style: {
                        layout: { padding: [12, 12] },
                        icon: { width: 42, height: 42, opacity: 0.9 },
                        box: { color: "#ED6D5230", round: 33, border: 0, boxShadow: "none" },
                        hover: { color: "#ED6D5250" },
                        active: { color: "#ED6D5270" },
                    },
                    onClick: deleteSelectedTasks,
                });

                const lblCount = Label({
                    left: BAR_WIDTH / 2 + 16,
                    top: 10,
                    text: "0",
                    fontSize: 19,
                    bold: 1,
                    padding: [8, 2],
                    round: 50,
                    color: "white",
                    border: 1,
                    borderColor: "#141414",
                    textColor: "#141414",
                    opacity: 0.7,
                });

            endBox();

            // BOX: The tasks (each row stands at its own top)
            const listBox = Box(SPACE, LIST_TOP, BAR_WIDTH, "calc(100% - " + (LIST_TOP + SPACE) + "px)", { color: "white" });
            listBox.scrollY = 1;
            if (typeof ScrollBar !== "undefined") ScrollBar({ scrollableBox: listBox });

        endBox();

        // *** FUNCTIONS:

        function addTypedTask() {
            const text = taskInput.text.trim();
            if (text === "") return;
            const tasks = TaskList.add(text);
            taskInput.text = "";
            createIn(listBox, () => rows.unshift(createRow(tasks[0])));
            placeRows();
        }

        function createRow(task) {

            // BOX: A task
            const rowBox = startBox(0, 0, BAR_WIDTH, 48, { color: "white", round: 5, clickable: 1, cursor: "pointer", role: "button", tabIndex: 0 });

                // BOX: The circle at the left (tomato when selected)
                const circle = Box(18, 18, 24, 24, { color: App.colors.whitesmoke, round: 12, border: 1, borderColor: "lightgray" });

                // LABEL: The text (it wraps)
                const lblText = Label({ left: ROW_TEXT_LEFT, top: ROW_SPACE, width: BAR_WIDTH - ROW_TEXT_LEFT - 24, plainText: task.text, fontSize: 24, textColor: App.colors.text });
                lblText.css = { whiteSpace: "normal", overflowWrap: "anywhere" };

            endBox();

            const row = { task: task, box: rowBox, lblText: lblText, circle: circle, isSelected: 0 };
            rowBox.height = lblText.height + ROW_SPACE * 2;
            rowBox.on("click", () => toggleRow(row));
            rowBox.on("keydown", function (self, event) {
                if (event.key == "Enter" || event.key == " ") toggleRow(row);
            });
            // WHY a moment later: a new row appears at its place at once; only the rows that move slide.
            rowBox.setMotion(ROW_MOTION);
            return row;

        }

        // The rows stand one under the other; the ones that move slide (top 0.2 s)
        function placeRows() {
            let top = 0;
            rows.forEach(function (row) {
                row.box.top = top;
                top += row.box.height;
            });
        }

        function toggleRow(row) {
            row.isSelected = row.isSelected ? 0 : 1;
            row.circle.color = row.isSelected ? SELECTED_COLOR : App.colors.whitesmoke;
            row.circle.borderColor = row.isSelected ? "transparent" : "lightgray"; // WHY: the border stays, nothing moves
            row.lblText.textColor = row.isSelected ? SELECTED_COLOR : App.colors.text;
            paintBars();
        }

        // The delete bar is seen while tasks are selected
        function paintBars() {
            const selectedCount = rows.filter((row) => row.isSelected).length;
            lblCount.text = String(selectedCount);
            deleteBar.visible = (selectedCount > 0) ? 1 : 0;
            addBar.visible = (selectedCount > 0) ? 0 : 1;
        }

        function deleteSelectedTasks() {
            const keptRows = rows.filter((row) => !row.isSelected);
            rows.filter((row) => row.isSelected).forEach((row) => row.box.remove());
            rows.length = 0;
            keptRows.forEach((row) => rows.push(row));
            TaskList.saveAll(rows.map((row) => row.task));
            placeRows();
            paintBars();
        }

        // *** INIT:
        taskInput.on("keydown", function (self, event) {
            // WHY isComposing: the Enter of a phone keyboard that is still writing a word does not add a half word.
            if (event.key == "Enter" && !event.isComposing) addTypedTask();
        });
        createIn(listBox, function () {
            TaskList.getAll().forEach((task) => rows.push(createRow(task)));
        });
        placeRows();

    },

});
