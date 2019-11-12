class UIModalOpenController {
    constructor(referenceModal, shouldActivateOverlay = true) {
        this.referenceModal = referenceModal;
        this.shouldActivateOverlay = shouldActivateOverlay;
        this.overlayContainer = document.getElementById('overlayContainer');
    }

    openModal() {
        this.referenceModal.style.display = 'inline';

        if(this.shouldActivateOverlay) {
            this.overlayContainer.style.display = 'inline';
        }
    }

    closeModal() {
        this.referenceModal.style.display = 'none';
        this.overlayContainer.style.display = 'none';
    }
}