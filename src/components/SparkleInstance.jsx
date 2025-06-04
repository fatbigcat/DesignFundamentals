function SparkleInstance({ color, size, style }) {
    return (
        <Wrapper>
            <Svg>
                width={size}
                height={size}
                viewBox="0 0 160 160" fill="none" style={style}>
                <path d="/assets/images/spark.svgrepo-com" fill={color} />
            </Svg>
        </Wrapper>
    );
}
const growAndShrink = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;
const Wrapper = styled.div`
    position: absolute;
    pointer-events: none;
    animation: ${growAndShrink} 600ms ease-in-out forwards;
`;
const Svg = styled.svg`
    animation: ${spin} 600ms linear forwards;
`;
