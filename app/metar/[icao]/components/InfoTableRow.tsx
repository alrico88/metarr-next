import { CSSProperties, useMemo } from 'react';
import classNames from 'clsx';

interface IInfoTableRowProps {
  title: string;
  value?: number | string;
  alignRight?: boolean;
  valueColor?: string;
}

export default function InfoTableRow({
  title,
  value = '',
  valueColor = '',
  alignRight = false,
}: IInfoTableRowProps) {
  const dataClass = useMemo(
    () =>
      classNames({
        'font-monospace': true,
        'text-end': alignRight,
      }),
    [alignRight],
  );

  const valueCellStyle = useMemo(() => {
    const style: CSSProperties = {};

    if (valueColor !== '') {
      style.color = valueColor;
    }

    return style;
  }, [valueColor]);

  return (
    <tr>
      <td className="fw-bold">{title}</td>
      <td className={dataClass} style={valueCellStyle}>
        {value}
      </td>
    </tr>
  );
}
