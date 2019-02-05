import * as View from "../view/View.mjs";
import Shape from "../model/Shape.mjs";
import ShapePresenter from "./ShapePresenter.mjs";

export default class Presenter {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this._shapePresenters = [];

        this._view.doOnWindowResize(this._onWindowResize.bind(this));
        this._view.doOnTabClick(this._view.setActiveTab.bind(this._view));

        this._view.doOnButtonClick(View.buttonSave, this._save.bind(this, false));
        this._view.doOnButtonClick(View.buttonSaveAs, this._save.bind(this, true));

        this._view.doOnButtonClick(View.buttonAddRectangle, this._addShape.bind(this, Shape.Type.rectangle));
        this._view.doOnButtonClick(View.buttonAddEllipse, this._addShape.bind(this, Shape.Type.ellipse));

        this._view.removeLoader()
    }

    _onWindowResize() {
        this._view.onWindowResize();

        for (let index = 0; index < this._shapePresenters.length; index++) {
            this._shapePresenters[index].onWindowResize()
        }
    }

    _addShape(type) {
        let shapePresenter = new ShapePresenter(type, this._model, this._view);
        this._shapePresenters.push(shapePresenter);
    }

    _save(showDialog) {
        let blob = new Blob([JSON.stringify(this._model)], {type: 'application/json'});

        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = "shapes_data.json";
        if (showDialog) {
            a.target = '_blank'; // FIXME
        }

        a.click();
    }
}