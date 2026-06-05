<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $email,
        public string $text,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Обращение с сайта cyclone-music-space.ru',
            to: [new Address(config('mail.admin'))],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail',
            with: [
                'name' => $this->name,
                'email' => $this->email,
                'text' => $this->text,
            ],
        );
    }
}
