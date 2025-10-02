import Svg, { Line } from 'react-native-svg';
import { horizontalResponsive, verticalResponsive } from 'utils/responsivenessControlFunction';
import { reportStyles } from '../../styles';
interface Point {
  x: number;
  y: number;
}

interface IPointsArray {
  id: string;
  point: Point[];
}

interface SectorIndicatorProps {
  showSector: boolean;
  points: IPointsArray[];
  strokeColor: string;
}

export const SectorIndicator = (props: SectorIndicatorProps) => {
  const { points, showSector, strokeColor } = props;
  let count = 0;

  const renderLines = (points: Point[]) => {
    return points.map((point: { x: number; y: number }, index: number) => {
      count += 1;
      return (
        <Line
          key={index}
          x1={horizontalResponsive(point.x)}
          y1={verticalResponsive(point.y)}
          x2={
            points[index + 1]
              ? horizontalResponsive(points[index + 1].x)
              : horizontalResponsive(point.x)
          }
          y2={
            points[index + 1]
              ? verticalResponsive(points[index + 1].y)
              : verticalResponsive(point.y)
          }
          stroke={strokeColor}
          strokeWidth={2}
        />
      );
    });
  };

  const renderMutipleSector = () => {
    if (points) {
      return points.map((item: IPointsArray, index: number) => {
        count = 0;
        return (
          <Svg
            key={index}
            height={verticalResponsive(200)}
            width={'100%'}
            style={[reportStyles.absolute]}
          >
            {renderLines(item.point)}
            {count === item.point.length ? (
              <Line
                x1={horizontalResponsive(item.point[item.point.length - 1].x)}
                y1={verticalResponsive(item.point[item.point.length - 1].y)}
                x2={horizontalResponsive(item.point[0].x)}
                y2={verticalResponsive(item.point[0].y)}
                stroke={strokeColor}
                strokeWidth={2}
              />
            ) : null}
          </Svg>
        );
      });
    }
  };

  return <>{showSector ? renderMutipleSector() : null}</>;
};
