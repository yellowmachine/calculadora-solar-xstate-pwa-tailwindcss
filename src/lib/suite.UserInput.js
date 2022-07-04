import { create, test, enforce } from 'vest';

const suite = create((data) => {
  test('yearconsume', 'El consumo anual es obligatorio', () => {
    enforce(data.yearconsume).isNotBlank();
  });

  test('yearconsume', 'El consumo anual debe ser un número', () => {
    enforce(data.yearconsume).isNumber();
  });

  test('power', 'La potencia es obligatoria', () => {
    enforce(data.power).isNotBlank();
  });

  test('powerrentedvalle', 'La powerrentedvalle es obligatoria', () => {
    enforce(data.powerrentedvalle).isNotBlank();
  });

  test('fixedrate', 'La fixedrate es obligatoria', () => {
    enforce(data.fixedrate).isNotBlank();
  });

  test('fixedvalle', 'La fixedvalle es obligatoria', () => {
    enforce(data.fixedvalle).isNotBlank();
  });

  test('vallerate', 'La vallerate es obligatoria', () => {
    enforce(data.vallerate).isNotBlank();
  });

  test('vallellano', 'La vallellano es obligatoria', () => {
    enforce(data.vallellano).isNotBlank();
  });

  test('picorate', 'La picorate es obligatoria', () => {
    enforce(data.picorate).isNotBlank();
  });

  test('numpanels', 'La numpanels es obligatoria', () => {
    enforce(data.numpanels).isNotBlank();
  });

  test('panelpower', 'La panelpower es obligatoria', () => {
    enforce(data.panelpower).isNotBlank();
  });

  test('batterycapacity', 'La batterycapacity es obligatoria', () => {
    enforce(data.batterycapacity).isNotBlank();
  });

  test('inversorpower', 'La inversorpower es obligatoria', () => {
    enforce(data.inversorpower).isNotBlank();
  });

  test('carannualkm', 'La carannualkm es obligatoria', () => {
    enforce(data.carannualkm).isNotBlank();
  });

  test('electriccarpower', 'La electriccarpower es obligatoria', () => {
    enforce(data.electriccarpower).isNotBlank();
  });

  test('carefficiency', 'La carefficiency es obligatoria', () => {
    enforce(data.carefficiency).isNotBlank();
  });

});

export default suite;