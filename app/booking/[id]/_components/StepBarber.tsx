import BarberSelector from "../_components/BarberSelector";
import { Barber } from "@/lib/types";

export default function StepBarber({
  barbers,
  selectedBarber,
  setSelectedBarber,
  onNext,
}: {
  barbers: Barber[] | undefined;
  selectedBarber: Barber | null;
  setSelectedBarber: (b: Barber) => void;
  onNext: () => void;
}) {
  return (
    <BarberSelector
      barbers={barbers}
      selectedBarber={selectedBarber}
      setSelectedBarber={(b) => {
        setSelectedBarber(b);
        onNext();
      }}
    />
  );
}
