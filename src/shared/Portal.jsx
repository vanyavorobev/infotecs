import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const PORTAL_ERROR_MSG ='There is no portal container in markup. Please add portal container with proper id attribute.';

const Portal = (props) => {
    const { id, children } = props;
    const [ container, setContainer ] = React.useState();

    React.useEffect(() => {
        if(id) {
            const portalComponent = document.getElementById(id);

            if(!portalComponent) {
                throw new Error(PORTAL_ERROR_MSG)
            }

            setContainer(portalComponent)
        }
    }, [id]);

    return container ? ReactDOM.createPortal(children, container) : null;
}

Portal.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
}

const createContainer = (options) => {
    if(document.getElementById(options.id)) return;

    const { id, mountNode = document.body } = options;

    const portalContainer = document.createElement('div');

    portalContainer.setAttribute("id", id);
    mountNode.appendChild(portalContainer);
}

export { createContainer, PORTAL_ERROR_MSG }
export default Portal;