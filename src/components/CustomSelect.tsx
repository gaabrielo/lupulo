import * as SwitchPrimitive from '@radix-ui/react-switch';
import { styled } from '@stitches/react';
import { TreeStructure } from 'phosphor-react';

const StyledSwitch = styled('div', {
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: 'black',
  borderRadius: '9999px',
  position: 'relative',
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

// hover:brightness-95
export function CustomSelect({ selected, onClick }: Props) {
  return (
    <button className="w-full px-5 py-4 bg-[#D9FFCB] flex gap-5 items-center rounded-lg relative cursor-default">
      <div className="w-[3.5rem] h-[3.5rem] rounded-full bg-[#F1FFED] flex items-center justify-center">
        <TreeStructure size="2.25rem" weight="light" />
      </div>

      <h1 className="text-left">
        Utilizando dados meteorológicos
        <br />
        do OpenWeather
      </h1>

      {/* <div className="absolute bottom-4 right-5">
        <SwitchPrimitive.Root checked={true} asChild>
          <StyledSwitch>
            <StyledThumb />
          </StyledSwitch>
        </SwitchPrimitive.Root>
      </div> */}
    </button>
  );
}
