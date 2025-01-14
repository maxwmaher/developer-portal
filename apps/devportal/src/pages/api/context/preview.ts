/* eslint-disable turbo/no-undeclared-env-vars */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getQueryValue } from 'sc-changelog/utils/requests';

// API handler that enables preview mode, executed when the users toggles the preview mode manually

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { clear, redirect } = req.query;
  const redirectUrl = getQueryValue(redirect);
  res.setHeader('Set-Cookie', ['_scdp_preview=manual; Path=/; Max-Age=3600']);

  if (clear != null) {
    res.clearPreviewData({});
    //console.log('Preview mode disabled');
  } else {
    res.setPreviewData({});
    //console.log('Preview mode enabled');
  }

  if (redirectUrl) {
    res.redirect(redirectUrl);
  }

  res.end();
}
