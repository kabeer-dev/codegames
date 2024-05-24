import PropTypes from 'prop-types';
import { useEffect } from 'react';
// third party
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
function ZoomOutAnimation({ children }) {
    const controls = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);
    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{ duration: 0.4, delay: 0.2 }}
            variants={{
                visible: { opacity: 1, translateX: 0, scale: 1 },
                hidden: { opacity: 0, translateX: 5, scale: 1.5 }
            }}
        >
            {children}
        </motion.div>
    );
}
ZoomOutAnimation.propTypes = {
    children: PropTypes.node
};

export default ZoomOutAnimation;
