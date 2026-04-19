import { Button, Group, Paper, TextInput, Title, type PaperProps } from '@mantine/core';
import { useForm } from '@mantine/form';

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

  return (
    <Paper radius="md" p="lg" withBorder {...props}>
        <form onSubmit={form.onSubmit(() => {})}>
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