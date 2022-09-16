import * as SwitchPrimitive from '@radix-ui/react-switch';
import { styled } from '@stitches/react';
import { TreeStructure } from 'phosphor-react';

const StyledSwitch = styled('div', {
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: '#000',
  borderRadius: '9999px',
  position: 'relative',
  // boxShadow: `0 2px 10px #000`,
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  // '&:focus': { boxShadow: `0 0 0 2px black` },
  '&[data-state="checked"]': { backgroundColor: 'black' },
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: 'block',
  marginTop: 2,
  width: 21,
  height: 21,
  backgroundColor: 'white',
  borderRadius: '9999px',
  boxShadow: `0 2px 2px #000`,
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(19px)' },
});

interface Props {
  selected: boolean;
  onClick: (event: MouseEvent) => void;
}

export function CustomSelect({ selected, onClick }: Props) {
  return (
    <button className="w-full px-5 py-4 bg-[#D9FFCB] flex gap-5 items-center rounded-lg hover:brightness-95 relative">
      <div className="w-[3.5vw] h-[3.5vw] rounded-full bg-[#F1FFED] flex items-center justify-center">
        <TreeStructure size="2.25vw" weight="light" />
      </div>

      <h1 className="text-left">
        Utilizar dados do
        <br />
        OpenWeather
      </h1>

      <div className="absolute bottom-4 right-5">
        <SwitchPrimitive.Root checked={true} asChild>
          <StyledSwitch>
            <StyledThumb />
          </StyledSwitch>
        </SwitchPrimitive.Root>
      </div>
    </button>
  );
}
