import { useRef } from "react";
import BodyRow from "../Table/BodyRow";
import RemoveButton from "../RemoveButton";
import TableButtonWrapper from "../Table/TableButtonWrapper";
import Td from "../Table/Td";
import Th from "../Table/Th";
import { IMovimentation } from "../../../utils/interfaces/movimentation";
import { moneyFormatter } from "../../../utils/functions/formatter";
import { MovimentationType } from "../../../utils/enums/movimentationType";
import { useCurrentRemoveTarget } from "../../../context/CurrentRemoveTargetCtx";
import { useMovimentation } from "../../../context/MovimentationCtx";
import { useOpenCloseRemoveModal } from "../../../context/OpenCloseRemoveModalCtx";

const ReceivedTable = () => {
  const { openRemoveModal } = useOpenCloseRemoveModal();
  const { receivedValues } = useMovimentation();
  const { setRemoveTargetID } = useCurrentRemoveTarget();
  const trRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  const removeMovimentation = (index: number) => {
    setRemoveTargetID(trRefs.current[index]?.id as string);
    openRemoveModal();
  };

  const setRef = (el: HTMLTableRowElement | null, index: number) =>
    (trRefs.current[index] = el);

  return (
    <table className="w-full">
      <thead className="bg-green-700">
        <tr>
          <Th>Data</Th>
          <Th>Valor</Th>
          <Th>Razão</Th>
          <Th>Ação</Th>
        </tr>
      </thead>
      <tbody className="bg-green-600 text-white">
        {receivedValues.map((receivedValue: IMovimentation, index: number) => (
          <BodyRow
            key={receivedValue.id}
            id={receivedValue.id}
            index={index}
            rowType={MovimentationType.Income}
            setRef={setRef}
          >
            <Td>{receivedValue.date.toString()}</Td>
            <Td>{moneyFormatter(Number(receivedValue.value))}</Td>
            <td className="border border-white border-opacity-20 p-2">
              {receivedValue.reason}
            </td>
            <Td>
              <TableButtonWrapper>
                <RemoveButton index={index} handleClick={removeMovimentation} />
              </TableButtonWrapper>
            </Td>
          </BodyRow>
        ))}
      </tbody>
    </table>
  );
};

export default ReceivedTable;
