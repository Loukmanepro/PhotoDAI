const canvas = new fabric.Canvas('canvas');
let uploadedImage;
let undoStack = [];
let redoStack = [];

// وظيفة لرفع الصورة وعرضها
document.getElementById('upload-btn').onclick = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = readerEvent => {
            uploadedImage = new fabric.Image.fromURL(readerEvent.target.result, img => {
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
                canvas.setWidth(img.width);
                canvas.setHeight(img.height);
                saveState();
            });
        }
        reader.readAsDataURL(file);
    }
    input.click();
};

// وظيفة لحفظ الحالة الحالية
function saveState() {
    undoStack.push(canvas.toJSON());
    redoStack = [];
}

// وظيفة لإزالة الخلفية (مثال بسيط)
document.getElementById('remove-bg-btn').onclick = function() {
    alert("ميزة إزالة الخلفية قيد التطوير.");
};

// وظيفة لتحسين الجودة (مثال بسيط)
document.getElementById('enhance-quality-btn').onclick = function() {
    alert("ميزة تحسين الجودة قيد التطوير.");
};

// وظيفة لتغيير نمط الصورة
document.getElementById('change-style-btn').onclick = function() {
    document.getElementById('style-options').classList.toggle('hidden');
};

// تغيير نمط الصورة
document.getElementById('anime-style').onclick = function() {
    alert("تم تغيير النمط إلى أنمي.");
    saveState();
};
document.getElementById('cartoon-style').onclick = function() {
    alert("تم تغيير النمط إلى كرتون.");
    saveState();
};
document.getElementById('drawing-style').onclick = function() {
    alert("تم تغيير النمط إلى رسم.");
    saveState();
};
document.getElementById('three-d-style').onclick = function() {
    alert("تم تغيير النمط إلى 3D.");
    saveState();
};

// وظيفة لحفظ الصورة
document.getElementById('save-btn').onclick = function() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL({ format: 'png' });
    link.download = 'image.png';
    link.click();
};

// وظيفة لتكبير الصورة
document.getElementById('zoom-in-btn').onclick = function() {
    canvas.setZoom(canvas.getZoom() * 1.1);
    saveState();
};

// وظيفة لتصغير الصورة
document.getElementById('zoom-out-btn').onclick = function() {
    canvas.setZoom(canvas.getZoom() * 0.9);
    saveState();
};

// وظيفة للخطوة إلى الخلف
document.getElementById('undo-btn').onclick = function() {
    if (undoStack.length > 0) {
        redoStack.push(canvas.toJSON());
        const lastState = undoStack.pop();
        canvas.loadFromJSON(lastState, canvas.renderAll.bind(canvas));
    }
};

// وظيفة للخطوة إلى الأمام
document.getElementById('redo-btn').onclick = function() {
    if (redoStack.length > 0) {
        const lastState = redoStack.pop();
        undoStack.push(canvas.toJSON());
        canvas.loadFromJSON(lastState, canvas.renderAll.bind(canvas));
    }
};

// وظيفة لفتح قائمة PRO
document.getElementById('pro-btn').onclick = function() {
    alert("فتح قائمة PRO.");
};