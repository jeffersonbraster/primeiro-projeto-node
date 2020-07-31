interface IMailCOnfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'contato@fanime.info',
      name: 'Jefferson da Fanime',
    },
  },
} as IMailCOnfig;
