class DragAndDrop {
  isDragging = false;
  holdingElement = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  offsetX = 0;
  offsetY = 0;
  touchStartY = 0;

  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.addEventListener("mousedown", this.handleStart.bind(this));
    this.element.addEventListener("touchstart", this.handleStart.bind(this), { passive: false });

    document.addEventListener("mousemove", this.handleMove.bind(this));
    document.addEventListener("touchmove", this.handleMove.bind(this), { passive: false });

    document.addEventListener("mouseup", this.handleEnd.bind(this));
    document.addEventListener("touchend", this.handleEnd.bind(this));
  }

  handleStart(event) {
    const isTouch = event.type === "touchstart";
    const clientX = isTouch ? event.touches[0].clientX : event.clientX;
    const clientY = isTouch ? event.touches[0].clientY : event.clientY;

    this.holdingElement = true;
    this.isDragging = false;

    this.startX = clientX;
    this.startY = clientY;
    this.currentX = clientX;
    this.currentY = clientY;

    // For mobile scrolling detection
    if (isTouch) {
      this.touchStartY = clientY;
    }
  }

  handleMove(event) {
    if (!this.holdingElement) return;

    const isTouch = event.type === "touchmove";
    const clientX = isTouch ? event.touches[0].clientX : event.clientX;
    const clientY = isTouch ? event.touches[0].clientY : event.clientY;

    // Detect if the user is scrolling on mobile
    if (isTouch) {
      const verticalMove = Math.abs(clientY - this.touchStartY);
      if (verticalMove > 10 && !this.isDragging) {
        // If vertical movement is significant, treat as scroll
        this.holdingElement = false;
        return;
      }
    }

    // Update dragging state
    this.isDragging = true;

    this.offsetX = clientX - this.currentX;
    this.offsetY = clientY - this.currentY;

    this.currentX = clientX;
    this.currentY = clientY;

    // Move the element
    this.element.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
    event.preventDefault(); // Prevent scrolling during dragging
  }

  handleEnd() {
    if (this.isDragging) {
      // Perform any necessary cleanup after dragging
    }

    this.holdingElement = false;
    this.isDragging = false;
  }
}

// Initialize drag-and-drop on elements
document.querySelectorAll(".draggable").forEach((element) => {
  new DragAndDrop(element);
});
