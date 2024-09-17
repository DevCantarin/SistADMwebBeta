import styled from "styled-components";

const Campo = styled.input`
  background: #f0f0f0;
  margin: 1em 0;
  box-sizing: border-box;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  width: 100%;
  padding: 16px;
`;

const Rotulo = styled.label`
  display: block;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: var(--azul-escuro);
`;

const Container = styled.div`
  width: 100%;
`;

interface Props {
  valor: any;
  tipo: string;
  placeholder: string;
  onChange?: (value: any) => void;
  label?: string;
  obrigatorio?: boolean; // Adicionando a prop obrigatoria como opcional
}

export default function CampoDigitacao({ valor, tipo, placeholder, onChange, label, obrigatorio }: Props) {
  return (
    <Container>
      {label && <Rotulo>{label}</Rotulo>}
      <Campo
        type={tipo}
        value={valor}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        required={obrigatorio} // Ajustando para que 'required' seja controlado pela prop 'obrigatorio'
      />
    </Container>
  );
}
