let divEl;
let pEl;
let divElRect;
let per;
let stepOffset;

function selectElements(idName) {
    divEl = document.getElementById(idName);
    pEl = document.querySelector('#' + idName + ' div');
    divElRect = divEl.getBoundingClientRect();

    switch (idName) {
        case 'divElement': stepOffset = 4; break;
        case 'divElement2': stepOffset = 2; break;
        default: stepOffset = 4;
    }
}

function colorChange(ev, divElementName) {
    console.log('clicked', ev);
    selectElements(divElementName);
    console.log(divElRect);
    pEl.style.cssText = `width: ${((ev.offsetX / divEl.offsetWidth) * 100)}% `;
    document.addEventListener('mousedown', (eev) => console.log(eev.offsetX, divEl.offsetWidth));

    function onMouseMove(ve) {
        console.log('Offset', ve.pageX, ve.offsetX)
        if (ve.pageX >= divElRect.left && ve.pageX <= divElRect.left + divElRect.width) {
            pElLength = ve.pageX - divElRect.left;
        } else if (ve.pageX < divElRect.left) {
            pElLength = 0;
        } else if (ve.pageX > divElRect.left + divElRect.width) {
            pElLength = divEl.offsetWidth;
        }
        console.log('Length', pElLength);
        //pElLength = ve.pageX > divElRect.left ? ve.pageX - divElRect.left : ve.offsetX
        //pElLength = pElLength < 0 ? 0 : pElLength;
        per = ((pElLength / divEl.offsetWidth) * 100);
        per = Math.floor(per);
        if (per % stepOffset == 0) {
            pEl.style.cssText = `width: ${per}% `;
            document.getElementById('perElement').textContent = per + '%';
        }
    }
    document.addEventListener('mousemove', onMouseMove);
    //divEl.addEventListener('mouseenter', onMouseMove);

    divEl.onmouseup, document.onmouseup = function () {
        console.log('OnMouseUP');
        document.removeEventListener('mousemove', onMouseMove);
        //divEl.removeEventListener('mouseenter', onMouseMove);
        divEl.onmouseup = null;
    };

}