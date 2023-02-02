interface Props {
    styles?: any;
}

export const Footer = ({ styles = {} }: Props) => {
    return (
        <p
            style={{
                ...styles,
                textAlign: 'center',
                paddingBottom: '10px',
                marginBottom: '1px',
            }}
        >
            Page done by Fabricio Di Paolo
        </p>
    );
};
