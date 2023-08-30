// Calculator.tsx
import React, { FC, useState } from 'react';
import { Select, TextInput, Box, Text, Grid, Button } from '@mantine/core';
import CopyToClipboard from 'react-copy-to-clipboard'; 


  const Calculator: FC = () => {
  const [shape, setShape] = useState('rectangle');
  const [length, setLength] = useState('');
  const [lengthUnit, setLengthUnit] = useState('meter');
  const [width, setWidth] = useState('');
  const [widthUnit, setWidthUnit] = useState('meter');
  const [radius, setRadius] = useState('');
  const [radiusUnit, setRadiusUnit] = useState('meter');
  const [base, setBase] = useState('');
  const [baseUnit, setBaseUnit] = useState('meter');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('meter');
  const [semiMajorAxis, setSemiMajorAxis] = useState('');
  const [semiMajorAxisUnit, setSemiMajorAxisUnit] = useState('meter');
  const [semiMinorAxis, setSemiMinorAxis] = useState('');
  const [semiMinorAxisUnit, setSemiMinorAxisUnit] = useState('meter');
  const [sectorRadius, setSectorRadius] = useState('');
  const [sectorRadiusUnit, setSectorRadiusUnit] = useState('meter');
  const [sectorAngle, setSectorAngle] = useState('');
  const [sectorAngleUnit, setSectorAngleUnit] = useState('degrees');

  const unitConversion = {
    meter: { factor: 1 },
    centimeter: { factor: 0.01 },
    millimeter: { factor: 0.001 },
    kilometer: { factor: 1000 },
    inch: { factor: 0.0254 },
    foot: { factor: 0.3048 },
    yard: { factor: 0.9144 },
    mile: { factor: 1609.34 },
    degrees: { factor: 1 },
    radians: { factor: Math.PI / 180 },
  };

  const resetFieldsAndResults = () => {
    setLength('');
    setLengthUnit('meter');
    setWidth('');
    setWidthUnit('meter');
    setRadius('');
    setRadiusUnit('meter');
    setBase('');
    setBaseUnit('meter');
    setHeight('');
    setHeightUnit('meter');
    setSemiMajorAxis('');
    setSemiMajorAxisUnit('meter');
    setSemiMinorAxis('');
    setSemiMinorAxisUnit('meter');
    setSectorRadius('');
    setSectorRadiusUnit('meter');
    setSectorAngle('');
    setSectorAngleUnit('degrees');
    setResults({ title: '', values: [] });
    setShowResultsTable(false);
  };

  const handleShapeChange = (value: string) => {
    setShape(value);
    resetFieldsAndResults();
  };

  const renderShape = () => {
    switch (shape) {
      case 'rectangle':
        return <div className="shape-preview rectangle"></div>;
      case 'circle':
        return <div className="shape-preview circle"></div>;
      case 'triangle':
        return <div className="shape-preview triangle"></div>;
      case 'trapezoid':
        return <div className="shape-preview trapezoid"></div>;
      case 'ellipse':
        return <div className="shape-preview ellipse"></div>;
      case 'sector':
        return <div className="shape-preview sector"></div>;
      default:
        return null;
    }
  };

  const rectangleResult = () => {
    const convertedLength =
      parseFloat(length) *
      (unitConversion[lengthUnit as keyof typeof unitConversion]?.factor || 1);
const convertedWidth =
  parseFloat(width) *
  (unitConversion[widthUnit as keyof typeof unitConversion]?.factor || 1);
    return (convertedLength * convertedWidth).toFixed(2);
  };

  const circleResult = () => {
    const convertedRadius =
      parseFloat(radius) *
      (unitConversion[radiusUnit as keyof typeof unitConversion]?.factor || 1);
    return (Math.PI * Math.pow(convertedRadius, 2)).toFixed(2);
  };

  const triangleResult = () => {
    const convertedBase =
      parseFloat(base) *
      (unitConversion[baseUnit as keyof typeof unitConversion]?.factor || 1);
    const convertedHeight =
      parseFloat(height) *
      (unitConversion[heightUnit as keyof typeof unitConversion]?.factor || 1);
    return ((convertedBase * convertedHeight) / 2).toFixed(2);
  };

  const trapezoidResult = () => {
    const convertedBase =
      parseFloat(base) *
      (unitConversion[baseUnit as keyof typeof unitConversion]?.factor || 1);
    const convertedTopBase =
      parseFloat(width) *
      (unitConversion[widthUnit as keyof typeof unitConversion]?.factor || 1);
    const convertedHeight =
      parseFloat(height) *
      (unitConversion[heightUnit as keyof typeof unitConversion]?.factor || 1);
    return (((convertedBase + convertedTopBase) * convertedHeight) / 2).toFixed(
      2
    );
  };

  const ellipseResult = () => {
     const convertedSemiMajorAxis =
       parseFloat(semiMajorAxis) *
       (unitConversion[semiMajorAxisUnit as keyof typeof unitConversion]
         ?.factor || 1);
     const convertedSemiMinorAxis =
       parseFloat(semiMinorAxis) *
       (unitConversion[semiMinorAxisUnit as keyof typeof unitConversion]
         ?.factor || 1);
    return (Math.PI * convertedSemiMajorAxis * convertedSemiMinorAxis).toFixed(
      2
    );
  };

 const sectorResult = () => {
   const convertedRadius =
     parseFloat(sectorRadius) *
     (unitConversion[sectorRadiusUnit as keyof typeof unitConversion]?.factor ||
       1);

   const convertedAngle =
     sectorAngleUnit === 'degrees'
       ? parseFloat(sectorAngle)
       : (parseFloat(sectorAngle) * 180) / Math.PI; 

   const area =
     sectorAngleUnit === 'degrees'
       ? (
           (convertedAngle / 360) *
           Math.PI *
           Math.pow(convertedRadius, 2)
         ).toFixed(2)
       : ((convertedAngle * Math.pow(convertedRadius, 2)) / 2).toFixed(2);

   const formula =
     sectorAngleUnit === 'degrees' ? `(θ/360) * π * r^2` : `(θ * r^2)/2`;

   return { area, formula };
 };



  const [showResultsTable, setShowResultsTable] = useState(false);

  interface Results {
    title: string;
    values: string[];
  }

  const [results, setResults] = useState<Results>({
    title: '',
    values: [],
  });

  const calculateArea = () => {
    let result = {
      title: '',
      values: [],
    };

    switch (shape) {
      case 'rectangle':
        setResults({
          title: 'Rectangle Area',
          values: [
            `Area = Length x Width`,
            `Area = ${length} ${lengthUnit} x ${width} ${widthUnit}`,
            `Area = ${rectangleResult()} m²`,
          ],
        });

        break;
      case 'circle':
        setResults({
          title: 'Circle Area',
          values: [`Area = π x Radius^2`, `Area = ${circleResult()} m²`],
        });
        break;
      case 'triangle':
        setResults({
          title: 'Triangle Area',
          values: [
            `Area = (Base x Height) / 2`,
            `Area = ${base} ${baseUnit} x ${height} ${heightUnit} / 2`,
            `Area = ${triangleResult()} m²`,
          ],
        });
        break;
      case 'trapezoid':
        setResults({
          title: 'Trapezoid Area',
          values: [
            `Area = ((Base 1 + Base 2) x Height) / 2)`,
            `Area = ((${base} ${baseUnit} + ${width} ${widthUnit}) x ${height} ${heightUnit}) / 2`,
            `Area = ${trapezoidResult()} m²`,
          ],
        });
        break;
      case 'ellipse':
        setResults({
          title: 'Ellipse Area',
          values: [
            `Area = π x Semi-Major Axis x Semi-Minor Axis`,
            `Area = π x ${semiMajorAxis} ${semiMajorAxisUnit} x ${semiMinorAxis} ${semiMinorAxisUnit}`,
            `Area = ${ellipseResult()} m²`,
          ],
        });
        break;
      case 'sector':
        const sectorResults = sectorResult();
        const areaFormula =
          sectorAngleUnit === 'degrees' ? `(θ/360°) x πr^2` : `(θ x r^2) / 2`;

        setResults({
          title: 'Sector Area',
          values: [
            `Formula = ${areaFormula}`,
            `Area = ${sectorResults.area} m²`,
          ],
        });
        break;

        break;

        break;
      default:
        setResults({
          title: '',
          values: [], 
        });
    }

    setShowResultsTable(true);
  };

  const clearInputs = () => {
    setShape('rectangle');
    resetFieldsAndResults();
  };


  return (
    <Grid h={'100%'} m={0}>
      <Grid.Col className="calculator-sidebar" sm={4}>
        <Box py={10} px={'16px'} w={{ base: '100%' }}>
          <div>
            <h2>Area Calculator</h2>
            <Select
              mb={'24px'}
              data={[
                'rectangle',
                'circle',
                'triangle',
                'trapezoid',
                'ellipse',
                'sector',
              ]}
              placeholder="Select a Shape"
              label="Select a Shape"
              value={shape}
              onChange={(value) => handleShapeChange(value as string)}
            />
            <div className="shape-preview-container">{renderShape()}</div>
            {/* Input fields and buttons */}
            {shape === 'rectangle' && (
              <>
                <TextInput
                  mb={'24px'}
                  placeholder="Length"
                  label="Length"
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={[
                    'meter',
                    'centimeter',
                    'millimeter',
                    'kilometer',
                    'inch',
                    'foot',
                    'yard',
                    'mile',
                  ]}
                  placeholder="Unit"
                  label="Unit"
                  value={lengthUnit}
                  onChange={(value) => setLengthUnit(value as string)}
                />
                <TextInput
                  mb={'24px'}
                  placeholder="Width"
                  label="Width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={[
                    'meter',
                    'centimeter',
                    'millimeter',
                    'kilometer',
                    'inch',
                    'foot',
                    'yard',
                    'mile',
                  ]}
                  placeholder="Unit"
                  label="Unit"
                  value={widthUnit}
                  onChange={(value) => setWidthUnit(value as string)}
                />
              </>
            )}
            {shape === 'circle' && (
              <>
                <TextInput
                  mb={'24px'}
                  placeholder="Radius"
                  label="Radius"
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={[
                    'meter',
                    'centimeter',
                    'millimeter',
                    'kilometer',
                    'inch',
                    'foot',
                    'yard',
                    'mile',
                  ]}
                  placeholder="Unit"
                  label="Unit"
                  value={radiusUnit}
                  onChange={(value) => setRadiusUnit(value as string)}
                />
              </>
            )}
            {shape === 'triangle' && (
              <>
                <TextInput
                  mb={'24px'}
                  placeholder="Base"
                  label="Base"
                  type="number"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={[
                    'meter',
                    'centimeter',
                    'millimeter',
                    'kilometer',
                    'inch',
                    'foot',
                    'yard',
                    'mile',
                  ]}
                  placeholder="Unit"
                  label="Unit"
                  value={baseUnit}
                  onChange={(value) => setBaseUnit(value as string)}
                />
                <TextInput
                  mb={'24px'}
                  placeholder="Height"
                  label="Height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={[
                    'meter',
                    'centimeter',
                    'millimeter',
                    'kilometer',
                    'inch',
                    'foot',
                    'yard',
                    'mile',
                  ]}
                  placeholder="Unit"
                  label="Unit"
                  value={heightUnit}
                  onChange={(value) => setHeightUnit(value as string)}
                />
              </>
            )}
            {shape === 'trapezoid' && (
              <>
                <TextInput
                  mb={'24px'}
                  placeholder="Base"
                  label="Base"
                  type="number"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={[
                    'meter',
                    'centimeter',
                    'millimeter',
                    'kilometer',
                    'inch',
                    'foot',
                    'yard',
                    'mile',
                  ]}
                  placeholder="Unit"
                  label="Unit"
                  value={baseUnit}
                  onChange={(value) => setBaseUnit(value as string)}
                />
                <TextInput
                  mb={'24px'}
                  placeholder="Top Base"
                  label="Top Base"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={[
                    'meter',
                    'centimeter',
                    'millimeter',
                    'kilometer',
                    'inch',
                    'foot',
                    'yard',
                    'mile',
                  ]}
                  placeholder="Unit"
                  label="Unit"
                  value={widthUnit}
                  onChange={(value) => setWidthUnit(value as string)}
                />
                <TextInput
                  mb={'24px'}
                  placeholder="Height"
                  label="Height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={[
                    'meter',
                    'centimeter',
                    'millimeter',
                    'kilometer',
                    'inch',
                    'foot',
                    'yard',
                    'mile',
                  ]}
                  placeholder="Unit"
                  label="Unit"
                  value={heightUnit}
                  onChange={(value) => setHeightUnit(value as string)}
                />
              </>
            )}
            {shape === 'ellipse' && (
              <>
                <TextInput
                  mb={'24px'}
                  placeholder="Semi-Major Axis"
                  label="Semi-Major Axis"
                  type="number"
                  value={semiMajorAxis}
                  onChange={(e) => setSemiMajorAxis(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={[
                    'meter',
                    'centimeter',
                    'millimeter',
                    'kilometer',
                    'inch',
                    'foot',
                    'yard',
                    'mile',
                  ]}
                  placeholder="Unit"
                  label="Unit"
                  value={semiMajorAxisUnit}
                  onChange={(value) => setSemiMajorAxisUnit(value as string)}
                />
                <TextInput
                  mb={'24px'}
                  placeholder="Semi-Minor Axis"
                  label="Semi-Minor Axis"
                  type="number"
                  value={semiMinorAxis}
                  onChange={(e) => setSemiMinorAxis(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={[
                    'meter',
                    'centimeter',
                    'millimeter',
                    'kilometer',
                    'inch',
                    'foot',
                    'yard',
                    'mile',
                  ]}
                  placeholder="Unit"
                  label="Unit"
                  value={semiMinorAxisUnit}
                  onChange={(value) => setSemiMinorAxisUnit(value as string)}
                />
              </>
            )}
            {shape === 'sector' && (
              <>
                <TextInput
                  mb={'24px'}
                  placeholder="Radius"
                  label="Radius"
                  type="number"
                  value={sectorRadius}
                  onChange={(e) => setSectorRadius(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={[
                    'meter',
                    'centimeter',
                    'millimeter',
                    'kilometer',
                    'inch',
                    'foot',
                    'yard',
                    'mile',
                  ]}
                  placeholder="Unit"
                  label="Unit"
                  value={sectorRadiusUnit}
                  onChange={(value) => setSectorRadiusUnit(value as string)}
                />
                <TextInput
                  mb={'24px'}
                  placeholder="Angle"
                  label="Angle"
                  type="number"
                  value={sectorAngle}
                  onChange={(e) => setSectorAngle(e.target.value)}
                />
                <Select
                  mb={'24px'}
                  data={['degrees', 'radians']}
                  placeholder="Unit"
                  label="Unit"
                  value={sectorAngleUnit}
                  onChange={(value) => setSectorAngleUnit(value as string)}
                />
              </>
            )}
            <Button size="md" color="violet" onClick={calculateArea}>
              <Text>Calculate</Text>
            </Button>
            <div style={{ marginTop: '10px' }}>
              <Button
                size="md"
                color="blue"
                onClick={clearInputs}
                style={{ marginRight: '10px' }}
              >
                <Text>Clear</Text>
              </Button>
            </div>
          </div>
        </Box>
      </Grid.Col>
      <Grid.Col sm={6}>
        {showResultsTable && (
          <Box
            p={'25px'}
            h="100%"
            className="calculator-results"
          >
            <Text weight={700} mb={8}>
              {results.title}
            </Text>
            <Box p={8} className="results-box">
              <CopyToClipboard text={results.values[2]}>
                {/* Use the CopyToClipboard component */}
                <Button size="sm" color="blue">
                  Copy Result
                </Button>
              </CopyToClipboard>
              {Array.isArray(results.values) &&
                results.values.map((result, index) => (
                  <div key={index}>{result}</div>
                ))}
            </Box>
          </Box>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default Calculator;