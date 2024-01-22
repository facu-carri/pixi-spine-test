let app
let spine

window.addEventListener("load", init)

function init(){
    app = new PIXI.Application();
    document.getElementById("canvas-container").appendChild(app.view);
    
    loadAsset('spineboy', 'https://pixijs.io/examples/examples/assets/pixi-spine/spineboy-pro.json', onAssetLoaded)
    app.start()
}

function loadAsset(asset, url, onload) {
    PIXI.loader
    .add(asset, url)
    .load(onload)
}

const onAssetLoaded = (loader, res) =>
{
    spine = new PIXI.spine.Spine(res.spineboy.spineData);
    spine.scale.set(0.5)
    spine.position.set(app.renderer.width/2,app.renderer.height/1.2);
    spine.state.setAnimation(0, 'idle', true);
    app.stage.addChild(spine);
    
    const animations = Object.keys(res.spineboy.data.animations)
    addAnimationsOptions(animations)
}

function addAnimationsOptions(animations) {
    for (let i = 0; i < animations.length; i++){
        const attrs = {
            'label': animations[i],
            'value': animations[i]
        }
        const option = createElement('option', attrs)
        addElement('animations', option)
    }
}

function createElement(name, attrs) {
    const elem = document.createElement(name)
    for (let key in attrs) {
        elem.setAttribute(key, attrs[key])
    }
    return elem
}

function addElement(id, elem) {
    document.getElementById(id).appendChild(elem)
}

function selectAnimation(anim) {
    spine.state.setAnimation(0, anim)
}

function getSelectionValue(name) {
    const elem = document.getElementById(name)
    return elem.options[elem.selectedIndex].value
}

function getElementValue(name) {
    const elem = document.getElementById(name)
    return elem.value
}

function applyAnimationChanges() {
    const animation = getSelectionValue('animations')
    const trackIndex = parseInt(getElementValue('animationTrack'))
    const loop = getSelectionValue('loop') == 'true' ? true : false

    spine.state.setAnimation(trackIndex, animation, loop)
}

function applyAlphaChanges() {
    const alpha = parseFloat(getElementValue('alpha'))
    const trackIndex = parseInt(getElementValue('alphaTrack'))
    const track = spine.state.getCurrent(trackIndex)

    track.alpha = alpha
}