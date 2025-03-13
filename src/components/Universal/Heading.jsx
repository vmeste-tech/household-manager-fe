import PropTypes from "prop-types";

const Heading = ({ children }) => {
  return (
    <p className="text-xl font-bold uppercase tracking-wider text-indigo-800 m-0 p-0">
      {children}
    </p>
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Heading;
