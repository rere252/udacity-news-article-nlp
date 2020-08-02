// TODO: this is bare minimum.
export const handleError = (err, resp) => {
  resp.status(500).json({
    message: 'Failed to process article',
    reason: err.message
  });
};
