import { ActionIcon, Button, CopyButton, Group, Paper, TextInput, Title, Tooltip, type PaperProps } from '@mantine/core';
import { CopyIcon, CheckIcon } from '@phosphor-icons/react';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { generateShortUrl } from '../api/api';
import type { UrlFormReq } from '../api/models';

export default function UrlShortenerForm(props: PaperProps) {
  const form = useForm({
    initialValues: {
      url: '',
    },
    // validate: {
    //   url: (value) => value.trim().length < 2,
    //   email: (value) => !/^\S+@\S+$/.test(value),
    //   subject: (value) => value.trim().length === 0,
    // },
  });

  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { url: string; }) => { 
    setLoading(true);
    const req: UrlFormReq = { url : values.url };
    const response = await generateShortUrl(req);
    const data = await response.json();
    setShortUrl(data.shortUrl);
    setLoading(false);
  } 

  return (
    <Paper radius="md" p="lg" withBorder {...props}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Title
                order={2}
                size="h1"
                style={{ fontFamily: 'Outfit, var(--mantine-font-family)' }}
                fw={900}
                ta="center"
            >
                📎URL Shortener
            </Title>
            <TextInput
                label="URL"
                placeholder="Enter long link here ..."
                name="url"
                variant="filled"
                {...form.getInputProps('url')}
            />
            <TextInput
                label="Generated shortened URL"
                placeholder="Your generated shortened URL ..."
                mt="md"
                variant="filled"
                readOnly
                value={shortUrl}
                rightSection={
                  loading ? (
                    <ActionIcon variant="subtle" loading>
                    </ActionIcon>
                  ) : (
                    <CopyButton  value={shortUrl}>
                      {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                          <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  )
                }
            />
            <Group justify="center" mt="xl">
                <Button type="submit" size="md">
                Generate Shortened URL!
                </Button>
            </Group>
        </form>
    </Paper>
  );
}