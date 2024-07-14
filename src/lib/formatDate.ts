import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy", { locale: ptBR });
};
