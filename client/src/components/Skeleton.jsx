const Skeleton = ({ height = '1rem', width = '100%', style = {} }) => {
    return (
        <div
            className="skeleton"
            style={{
                height,
                width,
                ...style
            }}
        />
    );
};

export const EventCardSkeleton = () => (
    <div className="card glass" style={{ height: '100%' }}>
        <Skeleton height="200px" style={{ marginBottom: '1rem', borderRadius: 'var(--radius)' }} />
        <Skeleton height="1.5rem" width="70%" style={{ marginBottom: '0.5rem' }} />
        <Skeleton height="1rem" width="40%" style={{ marginBottom: '1rem' }} />
        <Skeleton height="3rem" width="100%" style={{ borderRadius: '4px' }} />
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton height="1rem" width="30%" />
            <Skeleton height="2rem" width="20%" style={{ borderRadius: '2rem' }} />
        </div>
    </div>
);

export default Skeleton;
