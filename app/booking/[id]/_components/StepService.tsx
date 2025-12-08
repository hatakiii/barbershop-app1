import ServiceSelector from "./ServiceSelector";
import { Salon, Service, Barber } from "@/lib/types";

export default function StepService({
  services,
  selectedService,
  setSelectedService,
  onNext,
}: {
  services: Service[];
  selectedService: Service | null;
  setSelectedService: (s: Service) => void;
  onNext: () => void;
}) {
  return (
    <ServiceSelector
      services={services}
      selectedService={selectedService}
      setSelectedService={(s) => {
        setSelectedService(s);
        onNext();
      }}
    />
  );
}
