/**
 * @class RemarkComponent
 * @property <Object {pRemarkId: string, txtRemarkId: string, btnEditRemarkId: string, btnSaveRemarkId: string}> childElementIds
 * @property <Element> element
 * @property <Element> dateCreateSpan
 * @property <Element> pRemarkElement
 * @property <Element> txtRemarkElement
 * @property <Element> btnEditRemarkElement
 * @property <Element> btnSaveRemarkElement
 * @property <String> remarkText
 */
class RemarkComponent {
    constructor(remark, isEditMode, landMark) {
        this.childElementIds = this.generateRemarkElementIds(remark);
        this.element = this.createRemarkElement(remark, this.childElementIds, isEditMode, landMark);
        this.remarkText = remark.text;
    }

    /**
     * @param <Remark> remark
     * @returns <Object {pRemarkId: string, txtRemarkId: string, btnEditRemarkId: string, btnSaveRemarkId: string}>
     */
    generateRemarkElementIds(remark) {
        const childElementIds = {};
        const standardElementId = `${remark.id}-${remark.landMarkId}`;
        childElementIds.pRemarkId = `pRemark-${standardElementId}`;
        childElementIds.txtRemarkId = `txtRemark-${standardElementId}`;
        childElementIds.btnEditRemarkId = `btnEditRemark-${standardElementId}`;
        childElementIds.btnSaveRemarkId = `btnSaveRemark-${standardElementId}`;
        childElementIds.otherRemarks = `pOtherRemarks-${standardElementId}`;
        return childElementIds;
    };

    /**
     * @param <Remark> remark
     * @param <Object {pRemarkId: string, txtRemarkId: string, btnEditRemarkId: string, btnSaveRemarkId: string}>
     * @param <Boolean> isEditMode
     */
    createRemarkElement(remark, childElementIds, isEditMode, landmark) {
        const remarkFragment = document.createDocumentFragment();
        const remarkElement = document.createElement("article");
        remarkElement.setAttribute('data-remark-id', remark.id);
        remarkElement.classList.add('remark-component');
        //Creates child controls
        this.dateCreateSpan = this.createDateCreatedDisplayElement(remark);
        this.pRemarkElement = this.createRemarkTextDisplayElement(remark, childElementIds.pRemarkId);
        this.txtRemarkElement = this.createRemarkTextEditElement(remark, childElementIds.txtRemarkId);
        this.btnEditRemarkElement = this.createRemarkEditButtonElement(childElementIds.btnEditRemarkId)
        this.btnSaveRemarkElement = this.createRemarkSaveButtonElement(childElementIds.btnSaveRemarkId);
        this.pOtherRemarksElement = this.createOtherRemarksElement(landmark,childElementIds.otherRemarks);
        //Sets the mode
        this.setCommentMode();//isEditMode ? this.setSaveMode() : this.setDisplayMode();
        //Adds child controls to the doc fragment
        remarkFragment.appendChild(this.pOtherRemarksElement);
        remarkFragment.appendChild(this.dateCreateSpan);
        remarkFragment.appendChild(this.pRemarkElement);
        remarkFragment.appendChild(this.txtRemarkElement);
        remarkFragment.appendChild(this.btnEditRemarkElement);
        remarkFragment.appendChild(this.btnSaveRemarkElement);
        //Adds the child controls to the component
        remarkElement.appendChild(remarkFragment);
        return remarkElement;
    };

    /**
     * @desc Creates the span to display the date the remark was created
     * @param <Remark> remark
     * @returns <Element>
     */
    createDateCreatedDisplayElement(remark) {
        const dateCreateSpan = document.createElement("span");
        dateCreateSpan.textContent = remark.dateMade;
        return dateCreateSpan;
    }

    /**
     * @desc Creates the p tag to display the remark text
     * @param <Remark> remark
     * @param <String> pRemarkId
     * @returns <Element>
     */
    createRemarkTextDisplayElement(remark, pRemarkId) {
        const pRemarkElement = document.createElement("p");
        pRemarkElement.setAttribute('id', pRemarkId);
        pRemarkElement.textContent = remark.text;
        return pRemarkElement;
    }

    createOtherRemarksElement(landmark, pRemarkId) {
        const pOtherRemarkElement = document.createElement("ul");
        pOtherRemarkElement.setAttribute('id', pRemarkId);
        if (landmark && landmark.otherNotes) {
            landmark.otherNotes.forEach(element => {
                const comment = document.createElement("li");
                const textElement = document.createElement("p");
                textElement.innerHTML = '<b>' + element.userName + '</b> : ' + element.text;
                comment.appendChild(textElement);
                pOtherRemarkElement.appendChild(comment);
            });
        }
        return pOtherRemarkElement;
    }

    /**
     * @desc Creates the textarea control to edit the remark text
     * @param <Remark> remark
     * @param <String> txtRemarkId
     * @returns <Element>
     */
    createRemarkTextEditElement(remark, txtRemarkId) {
        const txtRemarkElement = document.createElement("textarea");
        txtRemarkElement.setAttribute('id', txtRemarkId);
        txtRemarkElement.setAttribute('placeholder', 'Say something about this location...');
        txtRemarkElement.textContent = remark.text;
        return txtRemarkElement;
    }
    /**
     * @desc Creates the save button
     * @param <String> btnSaveRemarkId
     * @returns <Element>
     */
    createRemarkSaveButtonElement(btnSaveRemarkId) {
        const btnSaveRemarkElement = document.createElement("button");
        btnSaveRemarkElement.setAttribute('id', btnSaveRemarkId);
        btnSaveRemarkElement.innerHTML = "Save";
        return btnSaveRemarkElement;
    }
    /**
     * @desc Creates the edit button
     * @param <String> btnEditRemarkId
     * @returns <Element>
     */
    createRemarkEditButtonElement(btnEditRemarkId) {
        const btnEditRemarkElement = document.createElement("button");
        btnEditRemarkElement.setAttribute('id', btnEditRemarkId);
        btnEditRemarkElement.innerHTML = "Edit";
        return btnEditRemarkElement;
    }
    /**
     * @desc Set the remark text and synchronizes display and edit elements
     */
    setRemarkText() {
        const newRemarkText = this.txtRemarkElement.value;
        this.pRemarkElement.textContent = newRemarkText;
        this.remarkText = newRemarkText;
    }
    /**
     * @desc Gets the remark text
     */
    getRemarkText() {
        return this.remarkText;
    }
    /**
     * @desc Toggles relevant controls for editing mode
     */
    setSaveMode() {
        this.pRemarkElement.classList.add('hide');
        this.btnEditRemarkElement.classList.add('hide');
        this.txtRemarkElement.classList.remove('hide');
        this.btnSaveRemarkElement.classList.remove('hide');
    }
    /**
     * @desc Toggles relevant controls for display mode
     */
    setDisplayMode() {
        this.txtRemarkElement.classList.add('hide');
        this.btnSaveRemarkElement.classList.add('hide');
        this.pRemarkElement.classList.remove('hide');
        this.btnEditRemarkElement.classList.remove('hide');
    }
    setCommentMode() {
        this.btnEditRemarkElement.classList.add('hide');        
    }
}
export default RemarkComponent;